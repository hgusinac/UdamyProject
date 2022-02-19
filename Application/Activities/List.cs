using System.Diagnostics;
using System.Collections.Generic;
using Domain;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using Presistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Domain.Activity>> { }


        public class Handler : IRequestHandler<Query, List<Domain.Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.MyProperty.ToListAsync();
            }


        }
    }
}