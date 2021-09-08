import { Expose } from 'class-transformer';

export class Image {
  @Expose()
  itemUrl: string;

  @Expose()
  largeSizeUrl: string;

  @Expose()
  mediumSizeUrl: string;

  @Expose()
  thumbnailUrl: string;

  constructor() {
    this.itemUrl = '';
    this.largeSizeUrl = '';
    this.mediumSizeUrl = '';
    this.thumbnailUrl = '';
  }
}
