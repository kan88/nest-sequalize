import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}
  async find(
    search = null,
    department = null,
    sono = null,
    company = null,
    limit = 20,
    offset = 0,
  ) {
    const MAX_LIMIT = 50;
    const ATTR_SEARCH_STRING = [
      {
        cn: {
          [Op.iLike]: search ? `${search} %` : '%%',
        },
      },
      {
        cn: {
          [Op.iLike]: search ? `${search}%` : '%%',
        },
      },
      {
        cn: {
          [Op.iLike]: search ? `%${search}%` : '%%',
        },
      },
      {
        department: {
          [Op.iLike]: search ? `%${search}%` : '%%',
        },
      },
    ];
    const ATTR_SEARCH_NUMBER = [
      {
        telephonenumber: {
          [Op.iLike]: search ? `%${search}%` : '%%',
        },
      },
      {
        samaccountname: {
          [Op.iLike]: search ? `${search}` : '%%',
        },
      },
    ];
    const isNumberInclude = search?.match(/\d{3}/g);
    let ATTR_SEARCH = [];
    isNumberInclude
      ? (ATTR_SEARCH = [...ATTR_SEARCH_NUMBER])
      : (ATTR_SEARCH = [...ATTR_SEARCH_STRING]);
    //1. step search 2 characters on fullname
    for (let i = 0; i < ATTR_SEARCH.length; i++) {
      const data = await this.userRepository.findAndCountAll({
        where: {
          sono: {
            [Op.iLike]: sono ? sono : '%%',
          },
          department: {
            [Op.iLike]: department ? `%${department}%` : '%%',
          },
          company: {
            [Op.iLike]: company ? `%${company}%` : '%%',
          },
          ...ATTR_SEARCH[i],
        },
        offset,
        include: { all: true, separate: true },
        order: [
          ['rang', 'DESC'],
          ['cn', 'ASC'],
        ],
        limit: limit > MAX_LIMIT ? MAX_LIMIT : limit,
        attributes: [
          'idusers',
          'cn',
          'objectsid',
          'whenchanged',
          'title',
          'telephonenumber',
          'department',
          'company',
          'samaccountname',
          'mail',
          'manager',
          'jpegphoto',
          'sono',
          'rang',
          'givenname',
          'sn',
          'departments',
        ],
      });
      if (data.count > 0) return data;
    }
    return [];
  }
  async findDepartments(search = '') {
    const data = await this.userRepository
      .findAll({
        where: {
          department: {
            [Op.iLike]: `%${search}%`,
          },
        },
        order: [['department', 'ASC']],
        group: ['department'],
        attributes: ['department'],
      })
      .then((data) => data.map((item) => item.department));

    return data;
  }
  async findTitles(search = '') {
    const data = await this.userRepository
      .findAll({
        where: {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        },
        order: [['title', 'ASC']],
        group: ['title'],
        attributes: ['title'],
      })
      .then((data) => data.map((item) => item.title));
    return data;
  }

  async findUser(samaccountname: string) {
    const data = await this.userRepository.findAll({
      where: {
        samaccountname,
      },
      attributes: [
        'idusers',
        'cn',
        'objectsid',
        'whenchanged',
        'title',
        'telephonenumber',
        'department',
        'company',
        'samaccountname',
        'mail',
        'manager',
        'jpegphoto',
        'sono',
        'rang',
        'givenname',
        'sn',
        'departments',
      ],
    });
    return data;
  }
  // async findCompanies(search = '') {
  //   const data = await this.userRepository.findAll({
  //     where: {
  //       company: {
  //         [Op.iLike]: `%${search}%`,
  //       },
  //     },
  //     order: [['company', 'ASC']],
  //     group: ['company'],
  //     attributes: ['company'],
  //   });
  //   return data;
  // }

  async findCompanies(search = '') {
    const data = await this.userRepository
      .findAll({
        where: {
          company: {
            [Op.iLike]: `%${search}%`,
          },
        },
        order: [['company', 'ASC']],
        group: ['company'],
        attributes: ['company'],
        raw: true,
      })
      .then((data) => data.map((item) => item.company));
    return data;
  }
}
