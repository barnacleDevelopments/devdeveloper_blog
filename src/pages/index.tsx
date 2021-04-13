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

  // filter state
  const { updatedPostList, addActiveCategory, removeActiveCategory } = useFilterBar(postList);

  // category hook 
  const { deleteCategory, updateCategory, addCategory, categories } = useCategories(categoriesList);

  // form visibility state
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);

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
  const toggleCreateForm = () => {
    createFormVisible ? setCreateFormVisible(false) : setCreateFormVisible(true)
  }

  if (isDesktop) {
    return (
      <DesktopBody>
        <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />
        <Container>
          <FilterBar
            addActiveCategory={addActiveCategory}
            removeActiveCategory={removeActiveCategory}
            categoryList={categoriesList} />
          <PostList>
            {postList.length === 0 ? <FallbackMessage message="Failed to retrieve posts... Try refreshing the page." /> :

              /* DISPLAY POST CARDS*/
              updatedPostList.map((post) => {
                return <PostSnip key={post._id} postId={post._id} title={post.title} content={post.content} />
              })}

          </PostList>
        </Container>
        {/* CREATE BUTTON */}
        {(!isLoading && isAdmin && user) &&
          <CreateBtn
            isDesktop={isDesktop}
            toggleCreateForm={toggleCreateForm}
          />}
        {/* CREATE FORM */}
        {createFormVisible ? <CategoryForm btnText="Create" name="" desc="" submitFunc={(formData) => addCategory(formData.name, formData.desc)} cancelFunc={toggleCreateForm} /> : null}
      </DesktopBody>

    )

  } else {
    return (
      <MobileBody>
        {/* CREATE FORM */}
        {createFormVisible ? <CategoryForm btnText="Create" name="" desc="" submitFunc={(formData) => addCategory(formData.name, formData.desc)} cancelFunc={toggleCreateForm} /> : null}

        {/* CREATE BUTTON */}
        {(!isLoading && isAdmin && user) &&
          <CreateBtn isDesktop={false} toggleCreateForm={toggleCreateForm} />}
        <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />

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



