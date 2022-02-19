using System.Diagnostics;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Presistence;
using System;
using Activity = Domain.Activity;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.MyProperty.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.MyProperty.FindAsync(id);
        }



    }
}