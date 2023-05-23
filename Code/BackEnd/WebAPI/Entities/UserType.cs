namespace WebAPI.Entities;

public enum UserType {
    NONE,
    MEMBER,
    EDITOR,
    ADMIN
}

public class CreateUserType {
    public static UserType fromInt(int i) {
        return (UserType) i;
    }

    public static UserType fromString(string param) {
        UserType result = UserType.NONE;
        if (param.ToLower().Equals("admin")) {
            result = UserType.ADMIN;
        }
        if (param.ToLower().Equals("editor")) {
            result = UserType.EDITOR;
        }
        if (param.ToLower().Equals("member")) {
            result = UserType.MEMBER;
        }
        return result;
    }
}