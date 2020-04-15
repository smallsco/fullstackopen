// Always returns 1.
const dummy = blogs => 1

// Given a list of blogs, return the total likes.
const totalLikes = blogs => (
  blogs.reduce((sum, blog) => sum + blog.likes, 0)
)

// Given a list of blogs, return the blog with the most likes.
const favouriteBlog = blogs => {
  let max = 0
  let favourite = null
  blogs.map((blog) => {
    if (blog.likes > max) {
      max = blog.likes
      favourite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })
  return favourite
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}