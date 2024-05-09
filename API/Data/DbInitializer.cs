using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Animal Farm",
                    Description =
                        "Animal Farm is a beast fable, in the form of a satirical allegorical novella, by George Orwell, first published in England on 17 August 1945. It tells the story of a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy. Ultimately, the rebellion is betrayed, and under the dictatorship of a pig named Napoleon, the farm ends up in a state as bad as it was before.",
                    Price = 400,
                    PictureUrl = "/images/products/animal-farm.png",
                    QuantityInStock = 1
                },
                new Product
                {
                    Name = "Frankenstein",
                    Description = "Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment. Though Frankenstein is infused with elements of the Gothic novel and the Romantic movement, many has argued for regarding it as the first true science-fiction story. The novel has had a considerable influence on literature and on popular culture; it has spawned a complete genre of horror stories, films, and plays.",
                    Price = 300,
                    PictureUrl = "/images/products/frankenstein.png",
                    QuantityInStock = 1
                },
                new Product
                {
                    Name = "Les Miserables",
                    Description =
                        "Les Miserables is a French historical novel by Victor Hugo, first published in 1862, considered as one of the greatest novels of the 19th century. Les Misérables has been popularized through numerous adaptations for film and television. Examining the nature of law and grace, the novel elaborates upon the history of France, the architecture and urban design of Paris, politics, moral philosophy, antimonarchism, justice, religion, and the types and nature of romantic and familial love.",
                    Price = 400,
                    PictureUrl = "/images/products/les-miserables.png",
                    QuantityInStock = 1
                },
                new Product
                {
                    Name = "Little Women",
                    Description =
                        "Little Women is a coming-of-age novel written by American novelist Louisa May Alcott. The novel has been said to address three major themes: Domesticity, Work, and True Love, all of them interdependent and each necessary to the achievement of its heroine's individual identity. Alcott created a new form of literature, one that took elements from romantic children's fiction and combined it with others from sentimental novels, resulting in a totally new genre.",
                    Price = 250,
                    PictureUrl = "/images/products/little-women.png",
                    QuantityInStock = 1
                },
                new Product
                {
                    Name = "Pride and Prejudice",
                    Description =
                        "Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness. Pride and Prejudice has consistently appeared near the top of lists of most-loved books among literary scholars and the reading public.",
                    Price = 400,
                    PictureUrl = "/images/products/pride-and-prejudice.png",
                    QuantityInStock = 1
                },
                new Product
                {
                    Name = "Hamlet",
                    Description =
                        "The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601. It is Shakespeare's longest play, with 29,551 words. Set in Denmark, the play depicts Prince Hamlet and his attempts to exact revenge against his uncle, Claudius, who has murdered Hamlet's father in order to seize his throne and marry Hamlet's mother. Hamlet is considered among the most powerful and influential tragedies in the English language, with a story capable of seemingly endless retelling and adaptation by others.",
                    Price = 100,
                    PictureUrl = "/images/products/hamlet.png",
                    QuantityInStock = 1
                },
                new Product
                {
                    Name = "The Great Gatsby",
                    Description =
                        "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. The novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan. Gatsby continues to attract popular and scholarly attention. Contemporary scholars emphasize the novel's treatment of social class, inherited versus self-made wealth, gender, race, and environmentalism, and its cynical attitude towards the American Dream.",
                    Price = 300,
                    PictureUrl = "/images/products/the-great-gatsby.png",
                    QuantityInStock = 1
                },
                new Product
                {
                    Name = "Crime and Punishment",
                    Description =
                        "Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. The novel is often cited as one of the supreme achievements in world literature. Crime and Punishment follows the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who plans to kill an unscrupulous pawnbroker, an old woman who stores money and valuable objects in her flat. Once the deed is done, however, he finds himself racked with confusion, paranoia, and disgust. His theoretical justifications lose all their power as he struggles with guilt and horror and confronts both the internal and external consequences of his deed.",
                    Price = 250,
                    PictureUrl = "/images/products/crime-and-punishment.png",
                    QuantityInStock = 1
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}