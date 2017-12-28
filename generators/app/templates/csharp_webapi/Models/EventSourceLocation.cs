using Microsoft.WindowsAzure.Storage.Table;

namespace <%= appname %>.Models
{
    public class EventSourceLocation : EventSourceState
    {
        public string Location { get; set; }

        public EventSourceLocation() { }
    }
}