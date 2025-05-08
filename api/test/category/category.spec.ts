import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'
import { AppModule } from '../../src/app/app.module'
import { CategoryWithChildrensInterface } from 'contracts'
import { Server } from 'http'

const checkCategoryStructure = (category: CategoryWithChildrensInterface): void => {
    expect(category).toHaveProperty('id')
    expect(typeof category.id).toBe('number')
    expect(category).toHaveProperty('name')
    expect(typeof category.name).toBe('string')
    expect(category).toHaveProperty('childrens')
    expect(Array.isArray(category.childrens)).toBe(true)

    category.childrens.forEach(checkCategoryStructure)
}

describe('CategoryController (e2e)', () => {
    let app: INestApplication<Server>

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    it('/category (GET) should return an array of categories with correct structure', async () => {
        await request(app.getHttpServer())
            .get('/category')
            .expect(200)
            .expect((res: Response) => {
                expect(Array.isArray(res.body)).toBe(true)

                const categories = res.body as CategoryWithChildrensInterface[]
                categories.forEach(checkCategoryStructure)
            })
    })
})
