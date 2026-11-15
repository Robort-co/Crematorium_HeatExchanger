"""Verify the published visual payload, without unpublished local audit records."""
from pathlib import Path
import hashlib
import json
import zipfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def verify():
    entries = (HERE / 'PAYLOAD.sha256').read_text(encoding='utf-8').splitlines()
    for line in entries:
        expected, relative = line.split('  ', 1)
        target = (ROOT / relative).resolve()
        if not target.is_relative_to(ROOT):
            raise ValueError('Manifest path outside project')
        if sha(target.read_bytes()) != expected:
            raise ValueError('Hash mismatch: ' + relative)
    archive_count = 0
    for number in (5, 6, 7):
        folder = ROOT / 'visualizations/baselines' / f'2026-11-15-v{number}'
        record = json.loads((folder / 'CHECKPOINT.json').read_text(encoding='utf-8'))
        archive = folder / record['Archive']
        if sha(archive.read_bytes()) != record['ArchiveSHA256']:
            raise ValueError('Archive hash mismatch')
        with zipfile.ZipFile(archive) as z:
            if z.testzip() is not None:
                raise ValueError('Archive CRC failure')
            manifest = (folder / 'MANIFEST.sha256').read_bytes()
            # Sidecar manifests may use CRLF while ZIP manifests store LF.
            # Compare manifest records, then hash every payload as raw bytes.
            if z.read('MANIFEST.sha256').decode('utf-8-sig').splitlines() != manifest.decode('utf-8-sig').splitlines():
                raise ValueError('Archive manifest mismatch')
            for line in manifest.decode('utf-8-sig').splitlines():
                expected, relative = line.split('  ', 1)
                if sha(z.read(relative)) != expected:
                    raise ValueError('Archived payload mismatch: ' + relative)
                if sha((ROOT / 'visualizations' / relative).read_bytes()) != expected:
                    raise ValueError('Frozen directory mismatch: ' + relative)
        archive_count += 1
    print(json.dumps({'payloadFilesVerified': len(entries), 'frozenArchivesVerified': archive_count,
                      'browserWebGLChecked': False, 'engineeringValidation': False}))


if __name__ == '__main__':
    verify()
