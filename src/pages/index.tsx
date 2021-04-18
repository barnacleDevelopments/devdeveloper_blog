/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: CategoryView.tsx
*/

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { InferGetServerSidePropsType } from 'next'

// COMPONENTS
import Card from "../components/Card";
import TextArea from "../components/TextArea";
import CreateBtn from "../components/CreateBtn";
import FallbackMessage from "../components/FallbackMessage";
import CategoryForm from "../components/CategoryForm";
import FilterBar from "../components/desktop_components/FilterBar";

// CONTROLLERS 
import Category from "../controllers/category_controller";
import Post from "../controllers/post_controller";

// HOOKS 
import useCategories from "../hooks/useCategories";
import useAuth from "../hooks/useAuth";
import PostSnip from "../components/PostSnip";
import useFilterBar from "../hooks/useFIlterBar";
import PostForm from "../components/PostForm";
import usePosts from "../hooks/usePosts";


// STYLES 
const MobileBody = styled("section")`
  
`;

const DesktopBody = styled("div")`


`;

const PostList = styled("div")`

`;

const Container = styled("div")`
    display: grid;
    grid-template-columns: 1.5fr 3fr; 
    column-gap: 10px;
`;

function IndexPage({ categoriesList, postList }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // category hook 
  const { deleteCategory, updateCategory, addCategory, categories } = useCategories(categoriesList);

  // post hook
  const { addPost, posts } = usePosts(postList);

  // filter state
  const { updatedPostList, addActiveCategory, removeActiveCategory } = useFilterBar(posts);

  // category form visibility state
  const [createCategoryFormVisible, setCreateCategoryFormVisible] = useState<boolean>(false);

  // post form visibility state
  const [createPostFormVisible, setCreatePostFormVisible] = useState<boolean>(false);

  // authentication authorization hook
  const { isLoading, user, isAdmin } = useAuth();

  // check if is desktop
  const [isDesktop, setDesktop] = useState<boolean>();

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
  };

  useEffect(() => {
    updateMedia();
  }, [])

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // form toggling function 
  const toggleCategoryCreateForm = () => {
    createCategoryFormVisible ? setCreateCategoryFormVisible(false) : setCreateCategoryFormVisible(true)
  }

  const togglePostCreateForm = () => {
    createPostFormVisible ? setCreatePostFormVisible(false) : setCreatePostFormVisible(true);
  }

  if (isDesktop) {
    return (
      <DesktopBody>
        <TextArea
          title="Welcome to my Blog"
          content="A collection of articles for techies, fitness junkies and more!" />
        <Container>
          <FilterBar
            addActiveCategory={addActiveCategory}
            removeActiveCategory={removeActiveCategory}
            categoryList={categoriesList} />
          <PostList>
            {posts.length === 0 ? <FallbackMessage message="Failed to retrieve posts... Try refreshing the page." /> :
              /* DISPLAY POST CARDS*/
              updatedPostList.map((post) => {
                return (
                  <PostSnip
                    key={post._id}
                    postId={post._id}
                    title={post.title}
                    content={post.content}
                  // cancelFunc={toggleForm}
                  // submitFunc={(postData: PostFormData) => {
                  //   updatePost(post._id, postData.title, postData.content)
                  // }} 
                  />
                )
              })}
          </PostList>
        </Container>

        {/* CREATE BUTTON */}
        {(!isLoading && isAdmin && user) &&
          <CreateBtn
            isDesktop={isDesktop}
            toggleCategoryCreateForm={toggleCategoryCreateForm}
            togglePostCreateForm={togglePostCreateForm}
          />}

        {/* CREATE CATEGORY FORM */}
        {createCategoryFormVisible &&
          <CategoryForm
            btnText="Create"
            name=""
            desc=""
            submitFunc={(formData) => addCategory(formData.name, formData.desc)}
            cancelFunc={toggleCategoryCreateForm}
          />}

        {/* CREATE POST FORM */}
        {createPostFormVisible &&
          <PostForm
            btnText="Create"
            title=""
            content=""
            cancelFunc={togglePostCreateForm}
            includesCategoryPicker={true}
            categoryList={categories}
            submitFunc={(postData) => {
              addPost(postData.title, postData.content, postData.catId)
            }}
          />
        }
      </DesktopBody>
    )
  } else {
    return (
      <MobileBody>
        {/* CREATE FORM */}
        {createCategoryFormVisible ? <CategoryForm
          btnText="Create"
          name=""
          desc=""
          submitFunc={(formData) => addCategory(formData.name, formData.desc)} cancelFunc={toggleCategoryCreateForm} /> : null}

        {/* CREATE BUTTON */}
        {(!isLoading && isAdmin && user) &&
          <CreateBtn
            isDesktop={false}
            toggleCategoryCreateForm={toggleCategoryCreateForm} />}
        <TextArea
          title="Welcome to my Blog"
          content="A collection of articles for techies, fitness junkies and more!" />

        {/* FALLBACK MESSAGE */}
        {categories.length === 0 ? <FallbackMessage message="Failed to retrieve categories... Try refreshing the page." /> :

          /* DISPLAY CATEGORY CARDS*/
          categories.map((cat) => {
            let postCount = cat.posts.length;
            return <Card key={cat._id} deleteCategory={deleteCategory} updateCategory={updateCategory} count={postCount} catId={cat._id} name={cat.name} desc={cat.desc} img="/" />
          })}
      </MobileBody>
    )
  }
}

export async function getServerSideProps() {

  // retrieve all categories from api
  const categoriesList = await Category.prototype.getAll();
  const postList = await Post.prototype.getAll();

  return {
    props: {
      categoriesList,
      postList
    } // will be passed to the page component as props
  }
}


export default IndexPage;



