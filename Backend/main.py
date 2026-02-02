from fastapi import FastAPI, Form, UploadFile, File, Depends, HTTPException,File
from fastapi.middleware.cors import CORSMiddleware 
from fastapi.responses import FileResponse,StreamingResponse
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash
import os, shutil, datetime, uuid

# Database Code
Database_URL = "postgresql://postgres:2020@localhost:5432/ABTube"
engine = create_engine(Database_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

Uploads_Folder = "./uploads"  
os.makedirs(Uploads_Folder, exist_ok=True)

# MODELS

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    reset_token = Column(String, nullable=True)

class Video(Base):
    __tablename__ = "videos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    category = Column(String, default="Other")
    duration = Column(String, default="00:00")
    file_path = Column(String) 
    likes = relationship("Like", backref="video") 
    user_id = Column(Integer, ForeignKey("users.id"))
    uploader = relationship("User")
    created_at = Column(DateTime, default=datetime.datetime.now)

class Like(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("videos.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.datetime.now)

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey("videos.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.now)
    user = relationship("User")


# Create Tables
Base.metadata.create_all(engine)

# Migration to add category column if missing
from sqlalchemy import text, inspect
try:
    with engine.connect() as conn:
        inspector = inspect(engine)
        columns = [col['name'] for col in inspector.get_columns('videos')]
        if 'category' not in columns:
            print("Migrating: Adding category column to videos table...")
            conn.execute(text("ALTER TABLE videos ADD COLUMN category VARCHAR DEFAULT 'Other'"))
            conn.commit()
            print("Migration successful.")
        
        if 'duration' not in columns:
            print("Migrating: Adding duration column to videos table...")
            conn.execute(text("ALTER TABLE videos ADD COLUMN duration VARCHAR DEFAULT '00:00'"))
            conn.commit()
            print("Migration successful - duration added.")
except Exception as e:
    print(f"Migration check/execution failed: {e}")    

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  
def getUserByToken(token: str,db:Session):
    return db.query(User).filter(User.username == token).first()   

@app.post("/api/register")
def register(
    username: str = Form(...),
    email: str = Form(...), 
    password: str = Form(...),
    db: Session = Depends(get_db)):
    
    if db.query(User).filter(User.username == username).first():
        raise HTTPException(status_code=400, detail="Username already exists")  
    user = User(username=username, email=email, password=generate_password_hash(password))
    db.add(user)
    db.commit()
    return {"message": "User registered successfully"}  

@app.post("/api/login")
def login(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == username).first()
    if not user or not check_password_hash(user.password, password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"access_token":user.username,"token_type":"bearer"}

@app.post("/api/forgot-password")
def forgot_password(email: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return {"message": "If this email exists, a reset code has been sent."}

    token = uuid.uuid4().hex
    
    user.reset_token = token
    db.commit()

    print("------------------------------------------------")
    print(f"📧 EMAIL SIMULATION: Reset Token for {email}: {token}")
    print("------------------------------------------------")

    return {"message": "Reset token generated. Check server console."}

@app.post("/api/reset-password")
def reset_password(
    token: str = Form(...), 
    new_password: str = Form(...), 
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.reset_token == token).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    user.password = generate_password_hash(new_password)
    user.reset_token = None
    db.commit()

    return {"message": "Password reset successfully. You can now login."}

@app.post("/api/upload")
def upload(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form("Other"),
    duration: str = Form("00:00"),
    token: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not title.strip() or not description.strip():
        raise HTTPException(status_code=400, detail="Title and description cannot be empty")
    
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file selected")
    
    user = getUserByToken(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")    
    
    unique_filename = f"{uuid.uuid4().hex}_{file.filename}"
    file_path = os.path.join(Uploads_Folder, unique_filename)
    
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
    
    video = Video(title=title, description=description, category=category, duration=duration, file_path=file_path, user_id=user.id)
    db.add(video)
    db.commit()
    db.refresh(video)
    
    return {"message": "Video uploaded successfully", "video_id": video.id}

@app.get("/api/videos")
def get_all_videos(db: Session = Depends(get_db)):
    videos = db.query(Video).all()
    return [
        {
            "id": video.id,
            "title": video.title,
            "description": video.description,
            "category": video.category,
            "duration": video.duration,
            "file_path": video.file_path,
            "user_id": video.user_id,
            "likes": [l.user_id for l in video.likes],
            "uploader": video.uploader.username,
            "created_at": video.created_at
        }
        for video in videos
    ]

@app.get("/api/video/{video_id}")
def stream_video(video_id: int, db: Session = Depends(get_db)):
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    if not os.path.exists(video.file_path):
        raise HTTPException(status_code=404, detail="Video file missing from server")

    file_size = os.path.getsize(video.file_path)
    
    def iterfile():
        with open(video.file_path, mode="rb") as file_like:
            yield from file_like
    
    return StreamingResponse(
        iterfile(), 
        media_type="video/mp4",
        headers={
            "Accept-Ranges": "bytes",
            "Content-Length": str(file_size)
        }
    )


@app.delete("/api/video/{video_id}")
def delete_video(video_id: int, token: str = Form(...), db: Session = Depends(get_db)):
    user = getUserByToken(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    if video.user_id != user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this video")
    try:
        if os.path.exists(video.file_path):
            os.remove(video.file_path)
    except FileNotFoundError:
        pass
    
    # Manually delete related records (since we're not using ON DELETE CASCADE in DB)
    db.query(Comment).filter(Comment.video_id == video_id).delete()
    db.query(Like).filter(Like.video_id == video_id).delete()
    
    db.delete(video)    
    db.commit() 
    return {"message": "Video deleted successfully"}    


@app.post("/api/like/{video_id}")
def like_video(video_id: int, token: str = Form(...), db: Session = Depends(get_db)):
    user = getUserByToken(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")

    existing_like = db.query(Like).filter(Like.video_id == video_id, Like.user_id == user.id).first()
    if existing_like:
        db.delete(existing_like)
        db.commit()
        liked = False
    else:
        like = Like(video_id=video.id, user_id=user.id)
        db.add(like)
        db.commit() 
        liked = True
    
    likes_count = db.query(Like).filter(Like.video_id == video_id).count()
    return {"liked": liked, "likes": likes_count}

@app.post("/api/liked/{video_id}")
def liked_video(video_id: int, token: str = Form(None), db: Session = Depends(get_db)):
    if not token:
        return {"liked": False}
    user = getUserByToken(token, db)
    if not user:
        return {"liked": False}
    liked = db.query(Like).filter(Like.video_id == video_id, Like.user_id == user.id).first() is not None
    return {"liked": liked}

@app.get("/api/comment/{video_id}")
def comment_video(video_id: int,db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.video_id == video_id).all()
    return[
        {
            "id": c.id,
            "text": c.comment,
            "user_id": c.user_id,
            "username": c.user.username,
            "video_id": c.video_id,
            "created_at": c.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        for c in comments
    ]

@app.post("/api/comment/{video_id}")
def comment_video(video_id: int,token: str = Form(...),comment  : str = Form(...),db: Session = Depends(get_db)):
    user = getUserByToken(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    if not comment.strip():
        raise HTTPException(status_code=400, detail="Comment cannot be empty")
    comment = Comment(video_id=video_id, user_id=user.id, comment=comment)
    db.add(comment)
    db.commit() 
    db.refresh(comment)

    return {"message": "Comment added successfully", "comment": comment}

@app.delete("/api/comment/{comment_id}")
def delete_comment(comment_id: int, token: str = Form(...), db: Session = Depends(get_db)):
    user = getUserByToken(token, db)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this comment")
    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted successfully"}