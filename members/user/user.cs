public class User {
    private string username { get; set; }
    private string passwordHash { get; set; }
    private string email { get; set; }

    public User(string username, string passwordHash, string email) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
    }
}