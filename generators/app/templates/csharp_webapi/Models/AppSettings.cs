namespace <%= appname %>.Models
{
    public class AppSettings
    {
      public LineSettings LineSettings { get; set; }
    }
    public class LineSettings
    {
        public string ChannelSecret { get; set; }
        public string ChannelAccessToken { get; set; }
        public string StorageConnectionString { get; set; }
    }
}