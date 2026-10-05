"""Build a static, server-independent watch page; media stays out of Git history."""
import argparse
import hashlib
import json
import shutil
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--output', type=Path, default=root/'_site')
parser.add_argument('--media-directory', type=Path, help='Optional local release asset directory')
args = parser.parse_args()
shutil.copytree(root/'showcase', args.output, dirs_exist_ok=True)
media = args.output/'videos'
media.mkdir(exist_ok=True)
for video in json.loads((root/'showcase/videos.json').read_text()):
    filename = video['file']
    if Path(filename).name != filename or not filename.endswith('.mp4'):
        raise ValueError('Invalid release filename')
    dest = media/filename
    if args.media_directory:
        shutil.copyfile(args.media_directory/filename, dest)
    else:
        url = f'https://github.com/Spotibuds/Frontend/releases/download/demo-suite-2026-10-05/{filename}'
        request = urllib.request.Request(url, headers={'User-Agent':'Spotibuds-demo-gallery'})
        with urllib.request.urlopen(request, timeout=60) as response, dest.open('wb') as stream:
            shutil.copyfileobj(response, stream)
    if hashlib.sha256(dest.read_bytes()).hexdigest() != video['sha256']:
        raise ValueError(f'Release checksum mismatch: {filename}')
    print(f'Verified {filename}')
(args.output/'.nojekyll').touch()
