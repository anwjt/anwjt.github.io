from flask import Flask, request, jsonify, send_file
from TikTokApi import TikTokApi
import os

app = Flask(__name__)

# Initialize TikTok API
api = TikTokApi.get_instance()

@app.route('/download', methods=['POST'])
def download_video():
    url = request.json.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    try:
        video = api.video(url=url)
        video_data = video.bytes()
        file_path = 'video.mp4'
        
        with open(file_path, 'wb') as f:
            f.write(video_data)
        
        return send_file(file_path, as_attachment=True, download_name='video.mp4')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)