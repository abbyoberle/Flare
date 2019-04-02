import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  Toast,
  View,
  Right,
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleHeader from './common/SimpleHeader';

import * as MakeCommentActions from '../actions/makeComments';

const stylesComments = StyleSheet.create({
  ContCommentButton: {
    paddingTop: 230,
    alignItems: 'center',
    
  },
  buttonComment: {
    marginBottom: 30,
    width: 330,
    alignItems: 'center',
    backgroundColor: '#e21d16',
  },
  buttonTextComment: {
    padding: 20,
    color: 'white',
  },
  buttonDisabledComment: {
    marginBottom: 30,
    width: 330,
    alignItems: 'center',
    backgroundColor: '#a0a0a0',
  },
  containerTextBoxComment: {
    paddingTop: 10,
    alignItems: 'center',
  },
  searchBarComment: {
    borderWidth: 1,
    width: 330,
    height: 300,
    // backgroundColor: '#D3D3D3',
    borderColor: '#A9A9A9',
    color: '#e21d16',
    fontSize: 20,
  }
});

class CreateCommentView extends Component {
  state = {
    commentText: '',
  };

  componentDidUpdate = () => {
    const { makeComment, ackCommentSuccess } = this.props;
    if (makeComment.commentSuccess) {
      ackCommentSuccess();
      const { navigation } = this.props;
      navigation.navigate('PostView', { commentSuccess: true });
    }
  };

  onCommentBtnPress = postDocId => {
    const { commentText } = this.state;
    const { createComment, userData } = this.props;
    console.log(postDocId);

    createComment(commentText, userData.username, postDocId);
    this.setState({ commentText: '' });
  };

  render() {
    const { navigation, makeComment } = this.props;
    const { commentText } = this.state;

    const postDocId = navigation.getParam('postDocId', null);

    const commentBtnText = makeComment.isCommenting
      ? 'Commenting...'
      : 'Comment';

    return (
      <Container>
        <SimpleHeader title="Comment" isBack navigation={navigation} />
        <Content>
          {/* <Form>
            <Item>
              <Input
                placeholder="Share your thoughts!"
                value={commentText}
                onChangeText={text => this.setState({ commentText: text })}
                disabled={makeComment.isCommenting}
              />
            </Item>
          </Form> */}

          <View style = {stylesComments.containerTextBoxComment}>
            <TextInput
              style={stylesComments.searchBarComment}
              placeholder=" Share your thoughts!"
              placeholderTextColor= "red"
              value={commentText}
              onChangeText={text => this.setState({ commentText: text })}
              disabled={makeComment.isCommenting}
              multiline={true}
            />
          </View>

          {/* <Button
            onPress={() => this.onCommentBtnPress(postDocId)}
            disabled={makeComment.isCommenting}
          >
            <Text>{commentBtnText}</Text>
          </Button> */}

          <View style={stylesComments.ContCommentButton}>
            <TouchableWithoutFeedback
              onPress={() => this.onCommentBtnPress(postDocId)}
              disabled={makeComment.isCommenting}
            >
              <View
                style={
                  makeComment.isCommenting
                    ? stylesComments.buttonDisabledComment
                    : stylesComments.buttonComment
                }
              >
                <Text style={stylesComments.buttonTextComment}>{commentBtnText}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          
          
        </Content>
      </Container>
    );
  }
}

// This functions tells redux to give this component the specified parts of the app state
// that are governed by the reducers.
// The returned object becomes part of the component's "this.props"
function mapStateToProps(state) {
  return {
    makeComment: state.MakeCommentsReducer,
    userData: state.AuthReducer.userData,
  };
}

// This functions tells redux to give this component access the the actions
// that we imported at the top of the file.
// The actions become part of the component's "this.props" as functions.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(MakeCommentActions, dispatch);
}

// connect everything and export the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCommentView);
