from flask import Flask, send_from_directory, make_response
import socket
import qrcode
import os

PORT = 8000
app = Flask(__name__, static_folder='.')

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip

# Generate QR code for the index page
ip = get_local_ip()
url = f"http://{ip}:{PORT}/index.html"

qr = qrcode.QRCode()
qr.add_data(url)
qr.make()
qr.print_ascii(invert=True)

print(f"Serving {url}")

def no_cache(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

# Route to serve static files without caching
@app.route('/<path:filename>')
def serve_file(filename):
    response = make_response(send_from_directory(os.getcwd(), filename))
    return no_cache(response)

@app.route('/')
def root():
    response = make_response(send_from_directory(os.getcwd(), 'index.html'))
    return no_cache(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, threaded=True)
