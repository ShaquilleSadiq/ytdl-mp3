import cp from 'child_process';
import fs from 'fs';

import ffmpeg from 'ffmpeg-static';

export class FormatConverter {
  private readonly ffmpegBinary: string;

  constructor() {
    if (!ffmpeg) {
      throw new Error('Failed to resolve ffmpeg binary');
    }
    this.ffmpegBinary = ffmpeg;
  }

  videoToAudio(videoData: Buffer, outputFile: string): void {
    if (fs.existsSync(outputFile)) {
      throw new Error(`Output file already exists: ${outputFile}`);
    }
    cp.execSync(`${this.ffmpegBinary} -loglevel 24 -i pipe:0 -vn -sn -c:a mp3 -ab 192k ${outputFile}`, {
      input: videoData,
    });
  }
}
