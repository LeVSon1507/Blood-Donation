import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NewArticle, article_endpoint, isEmpty } from 'src/utils';
import LoadingCommon from 'src/components/LoadingCircle';
import ErrorPage from 'src/components/ErrorPage';
import Article from './New';

function News() {
   const [error, setError] = useState('');
   const [data, setData] = useState<NewArticle[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      axios
         .get<{ results: NewArticle[] }>(article_endpoint)
         .then(res => {
            setData(res?.data?.results);
            setIsLoading(false);
         })
         .catch(err => {
            setError(err?.message);
            setIsLoading(false);
         });
   }, []);

   return isLoading ? (
      <LoadingCommon additionalClass='h-[100vh]' />
   ) : error ? (
      <ErrorPage message={error} />
   ) : !isEmpty(data) ? (
      <>
         <Article data={data} />;
      </>
   ) : (
      <></>
   );
}
export default News;
