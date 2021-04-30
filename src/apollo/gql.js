import { gql } from '@apollo/client';

export const ALL_DRAMAS = gql`
  {
    allDramas {
      _id
      title
      url
      summary
      cover
      youtube
      image1
      image2
      image3
      img1_title
      img2_title
      img3_title
      video1
      video2
      video3
    }
  }
`;

export const GET_DRAMA = gql`
  query($url: String!) {
    getDramaByUrl(url: $url) {
      _id
      title
      url
      summary
      cover
      youtube
      image1
      image2
      image3
      img1_title
      img2_title
      img3_title
      video1
      video2
      video3
    }
  }
`;

export const ADD_DRAMA = gql`
  mutation(
    $title: String!
    $url: String!
    $summary: String!
    $cover: String!
    $youtube: String!
    $image1: String!
    $image2: String!
    $image3: String!
    $img1_title: String!
    $img2_title: String!
    $img3_title: String!
    $video1: String!
    $video2: String!
    $video3: String!
  ) {
    addDrama(
      title: $title
      url: $url
      summary: $summary
      cover: $cover
      youtube: $youtube
      image1: $image1
      image2: $image2
      image3: $image3
      img1_title: $img1_title
      img2_title: $img2_title
      img3_title: $img3_title
      video1: $video1
      video2: $video2
      video3: $video3
    ) {
      title
    }
  }
`;

export const REMOVE_DRAMA = gql`
  mutation($_id: ID!) {
    removeDrama(_id: $_id) {
      _id
      title
    }
  }
`;

export const UPDATE_DRAMA = gql`
  mutation(
    $_id: ID
    $title: String
    $url: String
    $summary: String
    $cover: String
    $youtube: String
    $image1: String
    $image2: String
    $image3: String
    $img1_title: String
    $img2_title: String
    $img3_title: String
    $video1: String
    $video2: String
    $video3: String
  ) {
    updateDrama(
      _id: $_id
      title: $title
      url: $url
      summary: $summary
      cover: $cover
      youtube: $youtube
      image1: $image1
      image2: $image2
      image3: $image3
      img1_title: $img1_title
      img2_title: $img2_title
      img3_title: $img3_title
      video1: $video1
      video2: $video2
      video3: $video3
    ) {
      title
    }
  }
`;
