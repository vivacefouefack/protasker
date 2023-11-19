using System.ComponentModel;

namespace ProTasker.Models
{
    public enum State
    {
        [Description("En cours")]
        InProgress = 0,

        [Description("Bloqué")]
        Blocked = 1,

        [Description("Terminé")]
        Finished = 2
    }
}
