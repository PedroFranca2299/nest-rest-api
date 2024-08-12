import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Pedro",
      "email": "pedro.cornutti@topinvest.com.br",
      "role": "INTERN"
    },
    {
      "id": 2,
      "name": "Opedr",
      "email": "opedr.cornutti@topinvest.com.br",
      "role": "INTERN"
    },
    {
      "id": 3,
      "name": "Roped",
      "email": "roped.cornutti@topinvest.com.br",
      "role": "ENGINEER"
    },
    {
      "id": 4,
      "name": "Drope",
      "email": "drope.cornutti@topinvest.com.br",
      "role": "ENGINEER"
    },
    {
      "id": 5,
      "name": "Edrop",
      "email": "edrop.cornutti@topinvest.com.br",
      "role": "ADMIN"
    }
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter(user => user.role === role)
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)
    return user
  }

  create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return { ...user, ...updatedUser }
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter(user => user.id !== id)

    return removedUser
  }

}
