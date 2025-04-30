import express from 'express';
import AdminForth, { Filters } from 'adminforth';
import usersResource from "./resources/adminuser.ts";
import attributeResource from "./resources/attribute.ts";
import translationResource from "./resources/translation.ts";
import productResource from "./resources/product.ts";
import mediaResource from "./resources/media.ts";
import categoryResource from "./resources/category.ts";
import productMediaResource from "./resources/product-media.ts";
import productAttributeValueResource from "./resources/product-attribute-value.ts";
import categoryAttributeResource from "./resources/category-attribute.ts";
import attributeGroupResource from "./resources/attribute-group.ts";
import unitResource from './resources/unit.ts'

const ADMIN_BASE_URL = '';

export const admin = new AdminForth({
  baseUrl: ADMIN_BASE_URL,
  auth: {
    usersResourceId: 'adminuser',
    usernameField: 'email',
    passwordHashField: 'password_hash',
    rememberMeDays: 30,
    loginBackgroundImage: 'https://images.unsplash.com/photo-1534239697798-120952b76f2b?q=80&w=3389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    loginBackgroundPosition: '1/2',
  },
  customization: {
    brandName: "admin",
    title: "admin",
    favicon: '@@/assets/favicon.png',
    brandLogo: '@@/assets/logo.svg',
    datesFormat: 'DD MMM',
    timeFormat: 'HH:mm a',
    showBrandNameInSidebar: true,
    emptyFieldPlaceholder: '-',
    styles: {
      colors: {
        light: {
          primary: '#1a56db',
          sidebar: { main: '#f9fafb', text: '#213045' },
        },
        dark: {
          primary: '#82ACFF',
          sidebar: { main: '#1f2937', text: '#9ca3af' },
        }
      }
    },
  },
  dataSources: [
    {
      id: 'maindb',
      url: `${process.env.DATABASE_URL}`
    },
  ],
  resources: [
    usersResource,
    attributeResource,
    translationResource,
    productResource,
    mediaResource,
    categoryResource,
    productMediaResource,
    productAttributeValueResource,
    categoryAttributeResource,
    attributeGroupResource,
    unitResource
  ],
  menu: [
    {
      label: 'Catalog',
      icon: 'flowbite:shopping-bag-solid',
      open: true,
      children: [
        {
          homepage: true,
          label: 'Products',
          icon: 'flowbite:user-solid',
          resourceId: 'Product',
        },
        {
          label: 'Categories',
          icon: 'flowbite:folder-solid',
          resourceId: 'Category',
        },
        {
          label: 'Attributes',
          icon: 'flowbite:tag-solid',
          resourceId: 'Attribute',
        },
        {
          label: 'Units',
          icon: 'flowbite:tag-solid',
          resourceId: 'Unit',
        },
        {
          label: 'Attribute Groups',
          icon: 'flowbite:user-solid',
          resourceId: 'AttributeGroup',
        },
        {
          label: 'Media',
          icon: 'flowbite:image-solid',
          resourceId: 'Media',
        },
        {
          label: 'Translations',
          icon: 'flowbite:user-solid',
          resourceId: 'Translation',
        },
        {
          label: 'Product Media',
          icon: 'flowbite:user-solid',
          resourceId: 'ProductMedia',
        },
        {
          label: 'Product Value',
          icon: 'flowbite:user-solid',
          resourceId: 'ProductAttributeValue',
        },
        {
          label: 'Category Attributes',
          icon: 'flowbite:user-solid',
          resourceId: 'CategoryAttribute',
        },
      ]
    },
    { type: 'heading', label: 'SYSTEM' },
    {
      label: 'Users',
      icon: 'flowbite:user-solid',
      resourceId: 'adminuser'
    },
  ],
});

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = express();
  app.use(express.json());

  const port = 3500;
  
  await admin.bundleNow({ hotReload: process.env.NODE_ENV === 'development' });
  console.log('Bundling AdminForth SPA done.');

  admin.express.serve(app)

  admin.discoverDatabases().then(async () => {
    if (!await admin.resource('adminuser').get([Filters.EQ('email', 'adminforth')])) {
      await admin.resource('adminuser').create({
        email: 'adminforth',
        password_hash: await AdminForth.Utils.generatePasswordHash('adminforth'),
        role: 'superadmin',
      });
    }
  });

  admin.express.listen(port, () => {
    console.log(`\n⚡ AdminForth is available at http://localhost:${port}${ADMIN_BASE_URL}\n`);
  });
}
