using WebAPI.Entities;

namespace WebAPI.DataManagement;

public class TempDatabase {
    public static List<Category> CategoryList = new List<Category>() {
        new Category {
            categoryId = 1,
            categoryTitle = "Nesli Tükenen Hayvanlar",
            categoryDescription = "Nesli tükenen hayvanlar konulu yazılar."
        },
        new Category {
            categoryId = 2,
            categoryTitle = "Küresel Isınma",
            categoryDescription = "Küresel ısınma konulu yazılar."
        },
        new Category {
            categoryId = 3,
            categoryTitle = "Bodur Bitkiler",
            categoryDescription = "Bodur bitkiler konulu yazılar."
        },
        new Category {
            categoryId = 4,
            categoryTitle = "Sağlıklı Beslenme",
            categoryDescription = "Nasıl sağlıklı beslenirim konulu yazılar."
        }
    };

    public static List<User> UserList = new List<User>() {
        new User {
            userId = 1,
            username = "user1",
            email = "email1@mail.com",
            password = "sifresifresifre",
            userType = "member",
            blocked = 0
        },
        new User {
            userId = 1,
            username = "user2",
            email = "email2@mail.com",
            password = "sifresifresifre",
            userType = "member",
            blocked = 0
        }
    };

    public static List<Content> ContentList = new List<Content>() {
        new Content {
            contentId = 1,
            title = "Pandalar ölüyor mu?",
            publishDate = new DateTime(2023, 5, 23, 23, 50, 10),
            content = "Evet, her canlı gibi onlar da ölüyor!",
            imagePath = "Assets/panda.jpg",
            authorId = 1,
            categoryId = 1,
            visibility = 1
        },
        new Content {
            contentId = 2,
            title = "Ortalama sıcaklıklar son 10 yılda 1 derece arttı!",
            publishDate = new DateTime(2023, 5, 23, 23, 50, 10),
            content = "Evet, doğru duydunuz! tam 1 derece!",
            imagePath = "Assets/gunes.jpg",
            authorId = 2,
            categoryId = 2,
            visibility = 1
        },
        new Content {
            contentId = 3,
            title = "Havucun muhtemelen bilmediğiniz 2 faydası!!",
            publishDate = new DateTime(2023, 5, 23, 23, 50, 10),
            content = "Tupturuncu bir havuç çok lezzetlidir ve kök halinde toprağın altında yetişir.",
            imagePath = "Assets/havuc.jpg",
            authorId = 1,
            categoryId = 4,
            visibility = 1
        }
    };

    public static List<Like> LikeList = new List<Like>() {
        new Like {
            likeId = 1,
            userId = 1,
            likedContentId = 1,
            dislike = 0
        },
        new Like {
            likeId = 2,
            userId = 1,
            likedContentId = 2,
            dislike = 0
        },
        new Like {
            likeId = 3,
            userId = 1,
            likedContentId = 3,
            dislike = 0
        },
        new Like {
            likeId = 4,
            userId = 2,
            likedContentId = 1,
            dislike = 0
        },
    };

    public static List<Comment> CommentList = new List<Comment>() {
        new Comment {
            commentId = 1,
            posterId = 1,
            contentId = 1,
            commentContent = "PANDALAR ÖLMESİN!"
        },
        new Comment {
            commentId = 2,
            posterId = 2,
            contentId = 2,
            commentContent = "NASIL OLUR?? DAHA DÜN DÜŞÜYOR DİYORDUNUZ!!!"
        },
        new Comment {
            commentId = 3,
            posterId = 2,
            contentId = 3,
            commentContent = "OLAMAZ MAVİ DEĞİLMİŞ!"
        }
    };
}