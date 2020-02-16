import React from 'react';

export default function Presentation() {
  return (
    <div>
      <h1>The best free stock photos shared by talented creators.</h1>
      <style jsx>
        {`
          div {
            margin-top: 60px;
            height: 636px;
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url('/images/home-presentation.jpg');
            background-size: cover;
            background-attachment: fixed;
            background-position: center;
          }

          h1 {
            font-size: 46px;
            width: 40%;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
