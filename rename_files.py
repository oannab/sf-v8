import os

def rename_jpg_files(directory):
  """
  Renames all .jpg files in a directory and its subdirectories, 
  including the name of the immediate parent directory in the new filename.

  Args:
    directory: The path to the directory containing the .jpg files.
  """
  for root, _, files in os.walk(directory):
    counter = 1
    try:
        # Get the name of the immediate parent directory
        parent_dir_name = os.path.basename(os.path.dirname(root))  
    except IndexError:
        print(f"Skipping directory {root} - not enough parent directories.")
        continue

    for filename in files:
      if filename.lower().endswith(".jpg"):
        new_filename = f"{parent_dir_name}_{str(counter).zfill(2)}.jpg" # keep track-counter of .jpg string name + add leading zero to maintain uniform file naming and keep order
        old_filepath = os.path.join(root, filename)
        new_filepath = os.path.join(root, new_filename)
        os.rename(old_filepath, new_filepath)
        counter += 1

rename_jpg_files(".")