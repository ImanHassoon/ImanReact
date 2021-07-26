using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Presistence;
using AutoMapper;

namespace Application.Activities
{
    public class Edit
    {
        public class command : IRequest
        {
            public Activity Activity { get; set; }   // Activity is the passing parameter sending from the client side
        }
        public class Handler : IRequestHandler<command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)  // inject datacontext  and mapper from presistence
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id); // this will return the record of activity from db depending on ID
               // activity.Title = request.Activity.Title ?? activity.Title; // ?? the user may or may not update title
               _mapper.Map(request.Activity, activity); // to map any data edit to the database
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}