
class CustomException : Exception
{
    public int StatusCode { get; set; } = 500;
    public CustomException(string message, int StatusCode) : base(message)
    {
        this.StatusCode = StatusCode;
    }
}
class CustomBadRequest : CustomException
{
    public CustomBadRequest(string message = "Bad request") : base(message, 400)
    {
    }
}
class CustomUnauthorized : CustomException
{
    public CustomUnauthorized(string message = "Unauthorized") : base(message, 401)
    {
    }
}

class CustomForbidden : CustomException
{
    public CustomForbidden(string message = "Forbidden") : base(message, 403)
    {
    }
}

class CustomNotFound : CustomException
{
    public CustomNotFound(string message = "Not found") : base(message, 404)
    {
    }
}

