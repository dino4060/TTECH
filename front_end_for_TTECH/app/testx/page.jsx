'use client';
import { CldUploadWidget } from 'next-cloudinary';

export default function ProductFormExample() {




  return (
    <CldUploadWidget uploadPreset="wdxleeuq">
      {({ open }) => {
        return (
          <button onClick={() => open()}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
