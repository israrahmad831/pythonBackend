from flask import Flask, jsonify
from flask_cors import CORS
from backend.routes.items import items_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Health check
    @app.get("/health")
    def health():
        return jsonify({"status": "ok"}), 200

    # Register blueprints
    app.register_blueprint(items_bp, url_prefix="/api")
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
