from PIL import Image

def get_gif_animation_time(gif_path):
    try:
        with Image.open(gif_path) as im:
 
            durations = []
            for frame in range(0, im.n_frames):
                im.seek(frame)
                durations.append(im.info['duration'])
            
 
            animation_time = sum(durations)
            return animation_time
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

gif_file = 'successgif.gif'
animation_time = get_gif_animation_time(gif_file)

if animation_time is not None:
    print(f"The animation time is {animation_time} ms.")
