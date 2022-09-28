using AppStore.Dtos;
using AppStore.Models;
using AutoMapper;
using System.Collections.Generic;

namespace AppStore
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ToolDto, Tool>();
            CreateMap<Tool, ToolDto>();
            CreateMap<CreateToolDto, Tool>();
        }
    }
}
