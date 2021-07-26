using Microsoft.EntityFrameworkCore.Update.Internal;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Presistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
               await _context.SaveChangesAsync(); // save data/changes into db
               return Unit.Value;
            }
        }
    }
}