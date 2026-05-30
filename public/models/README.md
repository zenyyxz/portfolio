# 3D Character Models Directory

This directory contains 3D character models for the Hero section.

## Directory Structure

```
models/
├── current/          # Your current 2D character image
│   └── character.png
├── astronaut/        # 3D Astronaut model
│   └── scene.gltf
├── robot/            # 3D Robot model
│   └── scene.gltf
└── developer/        # 3D Developer/Hacker model
    └── scene.gltf
```

## How to Add Models

1. **Current Character (2D Image)**
   - Place your current hero image as `current/character.png`
   - Supported formats: PNG, JPG, WebP

2. **3D Models (GLTF/GLB)**
   - Download 3D models from free sources (see 3d_models_setup.md)
   - Place the main `.gltf` or `.glb` file as `scene.gltf` in each folder
   - Include any associated `.bin` files and `textures/` folders

## Free 3D Model Sources

- **Poly Pizza**: https://poly.pizza/ (CC0 License)
- **Quaternius**: http://quaternius.com/ (CC0 License)
- **Kenney**: https://kenney.nl/assets (CC0 License)
- **Mixamo**: https://www.mixamo.com/ (Free with Adobe account)
- **Sketchfab**: https://sketchfab.com/ (Many free models with attribution)

## Model Requirements

- **Format**: GLTF (.gltf) or GLB (.glb) preferred
- **Size**: Keep models under 5MB for fast loading
- **Optimization**: Use tools like gltf-pipeline to optimize models
- **Textures**: Include all texture files in the same directory

## Testing

After adding models, they will appear in the Admin Panel → Hero Section → Character Gallery.

## Notes

- The gallery automatically detects `.png` files and shows them as images
- `.gltf` files show a 🎨 icon placeholder (will render in 3D when implemented)
- You can still use custom URLs by pasting them in the input field below the gallery
