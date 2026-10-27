"""Лёгкий статический сервер для Amvera (Контур 2 — сайт мероприятий).

Раздаёт содержимое каталога public/ на порту из переменной PORT
(по умолчанию 8080). Без внешних зависимостей.
"""
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent / "public"
PORT = int(os.getenv("PORT", "8080"))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):  # тихий лог
        pass


if __name__ == "__main__":
    print(f"Serving {ROOT} on :{PORT}")
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
