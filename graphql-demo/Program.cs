using System;
using HotChocolate;
using HotChocolate.Types;

namespace graphql_demo
{
    class Program
    {
        static void Main(string[] args)
        {
            var schema = Schema.Create(c => c.RegisterType<ObjectType<Query>>());
        }
    }
}
