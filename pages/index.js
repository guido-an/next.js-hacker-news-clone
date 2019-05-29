import fetch from "isomorphic-unfetch";
import Error from 'next/error'
import StoryList from '../components/StoryList.js'
import Layout from '../components/Layout'
import Link from 'next/link'


class Index extends React.Component {
  static async getInitialProps({req, res, query}) {  // context object from the server 
    let stories; 
    let page;
    
    try {
      page = Number(query.page) || 1;  // start from the query page || default 1

      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}` 
      );
      stories = await response.json()
    } catch (err) {
      console.log(err);
      stories = []
    }
     console.log(stories)
    return { stories, page };  // return stories and number of page 
  }
  render() {
      const {stories, page } = this.props  // decustructing the object 

      if(stories.length === 0) {
          return <Error statusCode={503}/>  // (if the API request fail)
      }
      console.log(stories)

    return (
       <Layout title="Hacker News" description="A Hacker News clone made with Next.js">
        <StoryList stories={stories} />  
        <footer>
            <Link href={`/?page=${page + 1}`}><a>Next page ({page + 1})</a></Link> 
            </footer>
            <style jsx>{`
                footer {
                    padding: 1em
                }
                footer a {
                    font-weight: bold;
                    color: black;
                    text-decoration: none
                }
                
                `}</style>
     </Layout>
    );
  }
}

export default Index;
