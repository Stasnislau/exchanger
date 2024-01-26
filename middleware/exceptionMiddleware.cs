using System.Net;
using Newtonsoft.Json;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;


        var errorResponse = new ErrorResponse
        {
            StatusCode = context.Response.StatusCode,
            Message = "Internal Server Error"
        };
        if (exception is HttpRequestException)
        {
            errorResponse.Message = exception.Message;
            errorResponse.StatusCode = context.Response.StatusCode;
        }
        var jsonError = JsonConvert.SerializeObject(errorResponse);
        await context.Response.WriteAsync(jsonError);
    }
}

public class ErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
}
