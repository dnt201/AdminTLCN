export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    shortInfo: string;
    phoneNumber: string;
    gender: Gender;
    dateCreated: Date;
    dateModified: Date;
    deleted: boolean;
    token: string;
    dateExpires: Date;
    isActive: boolean;
    avatarId: string;
    currentHashedRefreshToken: string;
    dateDeleted: Date;
    avatar: File;
    role: Role;
    userFollows: User[];
    followers: User[];
    posts: Post[];
    postVotes: PostVote[];
    postComments: PostComment[];
    postReplies: PostReply[];
    postCommentTags: PostCommentTag[];
}
export interface UserFollow {
    userId: string;
    userFollowId: string;
    follower: User;
    userFollow: User;
}
export interface File {
    id: string;
    filename: string;
    path: string;
    mimetype: string;
}
export interface Role {
    id: string;
    role: string;
    displayName: string;
    user: User[];
    rolePermission: RolePermission[];
}
export interface Post {
    id: string;
    title: string;
    content: string;
    isPublic: boolean;
    dateCreated: Date;
    dateModified: Date;
    dateDeleted: Date;
    deleted: boolean;
    postVotes: PostVote[];
    postComments: PostComment[];
    owner: User;
    category: Category;
    tags: PostTag[];
}
export interface PostVote {
    postId: string;
    userId: string;
    type: boolean;
    dateModified: Date;
    post: Post;
    user: User;
}
export interface PostComment {
    commentId: string;
    postId: string;
    userId: string;
    content: string;
    dateModified: Date;
    post: Post;
    user: User;
    postReplies: PostReply[];
}
export interface PostReply {
    replyId: string;
    commentId: string;
    userId: string;
    content: string;
    dateModified: Date;
    postComment: PostComment;
    user: User;
}
export interface PostCommentTag {
    commentTagId: string;
    userId: string;
    commentId: string;
    typeOfComment: string;
    dateCreated: Date;
    user: User;
}
export interface Category {
    id: string;
    categoryName: string;
    rootCategory: Category;
    childCategory: Category[];
    posts: Post[];
}
export interface PostTag {
    id: string;
    postTagName: string;
    displayName: string;
    colorCode: string;
    posts: Post[];
}
export interface UserFollowPost {
    postId: string;
    userId: string;
    post: Post;
    user: User;
}
export interface Setting {
    group: string;
    key: string;
    value: string;
}
export interface Permission {
    id: string;
    permission: string;
    displayName: string;
    rolePermission: RolePermission[];
}
export interface RolePermission {
    roleId: string;
    permissionId: string;
    role: Role;
    permission: Permission;
}
export enum Gender {
    Male = 'Male',
    Female = 'Female',
    LGBT = 'LGBT',
    Unknown = 'Unknown',
}
