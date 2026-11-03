#!/usr/bin/env python3
"""
Report Cyber - Local Development Web Server
Runs a lightweight HTTP server on port 8080 with auto-launch capability.
"""

import http.server
import socketserver
import os
import webbrowser
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n========================================================")
        print(f"  REPORT CYBER - Local Incident Response Portal Server")
        print(f"  URL: {url}")
        print(f"  Directory: {DIRECTORY}")
        print(f"  Press Ctrl+C to terminate the server.")
        print(f"========================================================\n")
        
        # Optionally open in browser
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down Report Cyber server.")
            httpd.server_close()
            sys.exit(0)

if __name__ == "__main__":
    run()
