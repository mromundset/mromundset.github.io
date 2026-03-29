import sys
from PIL import Image, ImageEnhance # pip install pillow

# --- THE GOLDEN CONFIGURATION ---
# We lock these values to match your React component exactly.
TARGET_WIDTH = 60        # Width in characters
ASPECT_RATIO = 3/4       # The shape of the container (0.75)
FONT_RATIO = 0.55        # Correction for tall characters (Inter/Mono fonts)

# The Palette (Dark to Light)
ASCII_CHARS = ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "]

def pixels_to_ascii(image):
    pixels = image.getdata()
    # Map pixels to characters based on brightness
    return "".join([ASCII_CHARS[pixel // 28] for pixel in pixels])

def main(image_path):
    try:
        # 1. Load & Enhance
        img = Image.open(image_path).convert("L")
        
        # Boost contrast so the face is visible in text
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.5) 
        
        # 2. Calculate Exact Dimensions
        # We enforce the aspect ratio by calculating the height mathematically.
        # Height = (Width / AspectRatio) * FontCorrection
        target_height = int(TARGET_WIDTH / ASPECT_RATIO * FONT_RATIO)
        
        # 3. Resize
        # This forces the image to fit our text grid perfectly.
        img = img.resize((TARGET_WIDTH, target_height))
        
        # 4. Generate
        ascii_str = pixels_to_ascii(img)
        
        # 5. Format Output
        # Break into lines of exactly TARGET_WIDTH length
        output = "\n".join(ascii_str[i:i+TARGET_WIDTH] for i in range(0, len(ascii_str), TARGET_WIDTH))
        
        print(f"\n--- SUCCESS: Generated {TARGET_WIDTH}x{target_height} Grid ---")
        print("\nCOPY THE CODE BETWEEN THE TICKS BELOW:\n")
        print(f"`\n{output}\n`;")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        print("Usage: python ascii_converter.py <image.jpg>")