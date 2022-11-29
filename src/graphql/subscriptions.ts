/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
      id
      title
      contents
      image
      votes {
        items {
          id
          vote
          post {
            id
            title
            contents
            image
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          postVotesId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          post {
            id
            title
            contents
            image
            createdAt
            updatedAt
            owner
          }
          content
          createdAt
          updatedAt
          postCommentsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
      id
      title
      contents
      image
      votes {
        items {
          id
          vote
          post {
            id
            title
            contents
            image
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          postVotesId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          post {
            id
            title
            contents
            image
            createdAt
            updatedAt
            owner
          }
          content
          createdAt
          updatedAt
          postCommentsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
      id
      title
      contents
      image
      votes {
        items {
          id
          vote
          post {
            id
            title
            contents
            image
            createdAt
            updatedAt
            owner
          }
          createdAt
          updatedAt
          postVotesId
          owner
        }
        nextToken
      }
      comments {
        items {
          id
          post {
            id
            title
            contents
            image
            createdAt
            updatedAt
            owner
          }
          content
          createdAt
          updatedAt
          postCommentsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
      id
      post {
        id
        title
        contents
        image
        votes {
          items {
            id
            vote
            createdAt
            updatedAt
            postVotesId
            owner
          }
          nextToken
        }
        comments {
          items {
            id
            content
            createdAt
            updatedAt
            postCommentsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      postCommentsId
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
      id
      post {
        id
        title
        contents
        image
        votes {
          items {
            id
            vote
            createdAt
            updatedAt
            postVotesId
            owner
          }
          nextToken
        }
        comments {
          items {
            id
            content
            createdAt
            updatedAt
            postCommentsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      postCommentsId
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
      id
      post {
        id
        title
        contents
        image
        votes {
          items {
            id
            vote
            createdAt
            updatedAt
            postVotesId
            owner
          }
          nextToken
        }
        comments {
          items {
            id
            content
            createdAt
            updatedAt
            postCommentsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      content
      createdAt
      updatedAt
      postCommentsId
      owner
    }
  }
`;
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onCreateVote(filter: $filter, owner: $owner) {
      id
      vote
      post {
        id
        title
        contents
        image
        votes {
          items {
            id
            vote
            createdAt
            updatedAt
            postVotesId
            owner
          }
          nextToken
        }
        comments {
          items {
            id
            content
            createdAt
            updatedAt
            postCommentsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      postVotesId
      owner
    }
  }
`;
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onUpdateVote(filter: $filter, owner: $owner) {
      id
      vote
      post {
        id
        title
        contents
        image
        votes {
          items {
            id
            vote
            createdAt
            updatedAt
            postVotesId
            owner
          }
          nextToken
        }
        comments {
          items {
            id
            content
            createdAt
            updatedAt
            postCommentsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      postVotesId
      owner
    }
  }
`;
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote(
    $filter: ModelSubscriptionVoteFilterInput
    $owner: String
  ) {
    onDeleteVote(filter: $filter, owner: $owner) {
      id
      vote
      post {
        id
        title
        contents
        image
        votes {
          items {
            id
            vote
            createdAt
            updatedAt
            postVotesId
            owner
          }
          nextToken
        }
        comments {
          items {
            id
            content
            createdAt
            updatedAt
            postCommentsId
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      postVotesId
      owner
    }
  }
`;
