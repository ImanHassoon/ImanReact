using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Mediator.Net.Contracts;
using MediatR;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Presistence;


namespace Application.Activities
{
    public class Detailes
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : MediatR.IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync (request.Id);
            }
        }

    }
}