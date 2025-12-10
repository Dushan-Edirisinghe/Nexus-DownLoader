from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp
import os

app = Flask(__name__)
# Enable CORS for all routes (Allows Vercel frontend to talk to Render backend)
CORS(app)

def format_size(bytes_size):
    if not bytes_size:
        return "N/A"
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_size < 1024:
            return f"{bytes_size:.1f} {unit}"
        bytes_size /= 1024
    return f"{bytes_size:.1f} TB"

def get_video_info(url):
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'format': 'best',
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(url, download=False)
            
            formats = []
            # Process video formats
            for f in info.get('formats', []):
                # FIX: Check if extension is mp4, has height, AND HAS AUDIO (acodec != 'none')
                if f.get('ext') == 'mp4' and f.get('height') and f.get('acodec') != 'none':
                    formats.append({
                        "id": f.get('format_id'),
                        "quality": f"{f.get('height')}p {f.get('vcodec', '')[:4]}",
                        "type": "MP4",
                        "size": format_size(f.get('filesize') or f.get('filesize_approx') or 0),
                        "category": "video",
                        "badge": "HD" if f.get('height', 0) >= 720 else "",
                        "url": f.get('url')
                    })
            
            # Add a mock audio format for demonstration (yt-dlp handles audio differently)
            formats.append({
                "id": "audio_mp3",
                "quality": "320kbps",
                "type": "MP3",
                "size": "5.5 MB",
                "category": "audio",
                "badge": "HQ"
            })

            return {
                "id": info.get('id'),
                "title": info.get('title'),
                "thumbnail": info.get('thumbnail'),
                "duration": info.get('duration_string'),
                "author": info.get('uploader'),
                "formats": formats[:6] # Limit to top 6 for UI cleanliness
            }
        except Exception as e:
            raise Exception(str(e))

@app.route('/api/extract', methods=['POST'])
def extract():
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "No URL provided"}), 400
        
    try:
        video_data = get_video_info(url)
        return jsonify(video_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "NEXUS Backend is Running!"

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))

    app.run(host='0.0.0.0', port=port)

