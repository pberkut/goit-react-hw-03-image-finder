// import { Component } from 'react';
// import { RotatingLines } from 'react-loader-spinner';
// import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ images, onSelectedImage }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li key={image.id}>
          <ImageGalleryItem
            image={image.webformatURL}
            tags={image.tags}
            onSelectedImage={onSelectedImage}
          />
        </li>
      ))}
    </ul>
  );
};

// export class ImageGallery extends Component {
//   state = {};

//   render() {
//     // if (status === 'pending' && images.length === 0)
//     //   return (
//     //     <div className="Spinner">
//     //       <RotatingLines />
//     //     </div>
//     //   );

//     if (status === 'resolved')
//       return (
//         <>
//           {/* <ul className="ImageGallery">
//             <ImageGalleryItem
//               images={images}
//               onSelectedImage={this.props.onSelectedImage}
//             />
//           </ul> */}

//           {status === 'pending' ? (
//             'Load'
//           ) : (
//             <Button onLoadMore={this.handleLoadMore} />
//           )}
//         </>
//       );

//     if (status === 'rejected') return toast.error(error);
//   }
// }
