from PIL import Image

file_path = "D:/newfolder/Web/aatarenu/public/hand-signs/"

# Open the WEBP image
web_image = Image.open(f"{file_path}6-hand.webp")

# Convert and save as PNG
web_image.save("6-hand.png", "PNG")