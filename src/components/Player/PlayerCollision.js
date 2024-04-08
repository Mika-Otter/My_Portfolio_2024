// import { Player } from "./Player";

// export class PlayerCollision extends Player {
//     constructor(props) {
//         super(props);
//     }

//     //CHECK HORIZONTAL COLLISION________________________________________________________
//     checkForHorizontalCollision() {
//         this.collidedLeft = false;
//         this.collidedRight = false;
//         for (let i = 0; i < this.collisionBlocks.length; i++) {
//             const collisionBlock = this.collisionBlocks[i];

//             if (
//                 this.position.x <= collisionBlock.position.x + collisionBlock.width &&
//                 this.position.x + this.width >= collisionBlock.position.x &&
//                 this.position.y <= collisionBlock.position.y + collisionBlock.height &&
//                 this.position.y + this.height >= collisionBlock.position.y
//             ) {
//                 if (this.velocity.x < -0) {
//                     this.velocity.x = 0;
//                     this.collidedLeft = true;

//                     this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
//                     break;
//                 }
//                 if (this.velocity.x > 0) {
//                     this.velocity.x = 0;
//                     this.collidedRight = true;

//                     this.position.x = collisionBlock.position.x - this.width - 0.01;
//                     break;
//                 }
//             }
//         }
//     }

//     // // CHECK VERTICAL COLLISION_______________________________________________________________
//     // checkForVerticalCollision({ camera, canvas }) {
//     //     for (let i = 0; i < this.collisionBlocks.length; i++) {
//     //         const collisionBlock = this.collisionBlocks[i];

//     //         if (
//     //             this.position.x <= collisionBlock.position.x + collisionBlock.width &&
//     //             this.position.x + this.width >= collisionBlock.position.x &&
//     //             this.position.y <= collisionBlock.position.y + collisionBlock.height &&
//     //             this.position.y + this.height >= collisionBlock.position.y
//     //         ) {
//     //             if (this.velocity.y < 0) {
//     //                 this.collidedTop = true;
//     //                 this.shouldPanCameraToTheTop({ camera, canvas });
//     //                 this.velocity.y = 0;
//     //                 this.position.y = collisionBlock.position.y + collisionBlock.height + 0.5;
//     //                 break;
//     //             }
//     //             if (this.velocity.y > 0) {
//     //                 this.shouldPanCameraToTheBottom({ camera, canvas });
//     //                 this.collidedBottom = true;
//     //                 this.collidedTop = false;
//     //                 this.grounded = true;
//     //                 this.velocity.y = 0;
//     //                 this.position.y = collisionBlock.position.y - this.height - 0.5;
//     //                 break;
//     //             }
//     //         } else {
//     //             this.grounded = false;
//     //         }
//     //     }
//     // }
// }
