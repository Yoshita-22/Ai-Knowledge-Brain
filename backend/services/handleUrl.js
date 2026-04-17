import read from "readability-js"

export const handleUrl = async(url)=>{
    let text = "";
    read(url, function(err, article, meta) {
  // Main Article
  console.log(article.content.text());
  text = article.content.text();
});
return text;
}

