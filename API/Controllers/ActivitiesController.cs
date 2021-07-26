using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Domain;
using Presistence;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.AspNetCore.Razor.Language.Intermediate;
using MediatR;
using Application.Activities;
using Mediator;
using System.Data.Common;

namespace API.Controllers
{
    public class ActivitiesController :BaseApiController
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator) {
            _mediator=mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _mediator.Send(new List.Query());
        }
        [HttpGet("{id}")] 
        public async Task<ActionResult<Activity>> GetActivity(Guid id) // this return <Activity>
        {
            return await _mediator.Send(new Detailes.Query{Id=id}); //** Mediator.send does not work
        }
        [HttpPost]
        public async Task<IActionResult> CreateActiviy([FromBody] Activity activity) //[FromBody] is a hint to the api controller to look to the body of the request to get the parameter activity
        {
            return Ok(await _mediator.Send(new Create.Command{Activity=activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity) //must passing id to activity object in handler
        {
            activity.Id=id;
            return Ok(await _mediator.Send(new Edit.command{Activity=activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await _mediator.Send(new Delete.Command{Id =id}));
        }
    }
}