using Microsoft.WindowsAzure.Storage.Table;

namespace <%= appname %>
{
    public class EventSourceLocation : EventSourceState
    {
        public string Location { get; set; }

        public EventSourceLocation() { }
    }
}