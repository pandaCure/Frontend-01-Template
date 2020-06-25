判断是否是服务端渲染 不是 删除#root下所有子节点
创建createFiberRoot tag=0 -> FiberRootNode -> reateFiber(HostRoot = 3, null, null, mode = 0)
```javascript
const FiberNode = {
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;

  this.alternate = null;
}
```
```
// UpdateQueue is a linked list of prioritized updates.
// UpdateQueue是优先更新的链接列表。
// Like fibers, update queues come in pairs: a current queue, which represents
// the visible state of the screen, and a work-in-progress queue, which can be
// mutated and processed asynchronously before it is committed — a form of
// double buffering. If a work-in-progress render is discarded before finishing,
// we create a new work-in-progress by cloning the current queue.
// 像fibers一样，更新队列成对出现：当前队列，代表
// 屏幕的可见状态，以及正在进行的队列，可以是
// 在提交之前进行异步更改和处理-一种形式
// 双缓冲。如果正在进行的渲染在完成前被丢弃，
// 通过克隆当前队列来创建新的在制品。
// Both queues share a persistent, singly-linked list structure. To schedule an
// update, we append it to the end of both queues. Each queue maintains a
// pointer to first update in the persistent list that hasn't been processed.
// The work-in-progress pointer always has a position equal to or greater than
// the current queue, since we always work on that one. The current queue's
// pointer is only updated during the commit phase, when we swap in the
// work-in-progress.
/ /两个队列共享一个持久的单链接列表结构。安排
// 更新，我们将其附加到两个队列的末尾。每个队列维护一个
// 指向持久列表中尚未处理的第一次更新的指针。
// 进行中的指针的位置始终等于或大于
// 当前队列，因为我们一直在处理该队列。当前队列的
// 指针仅在提交阶段（当我们交换
// 工作正在进行中。
// For example:
//
//   Current pointer:           A - B - C - D - E - F
//   Work-in-progress pointer:              D - E - F
//                                          ^
//                                          The work-in-progress queue has
//                                          processed more updates than current.
//
// The reason we append to both queues is because otherwise we might drop
// updates without ever processing them. For example, if we only add updates to
// the work-in-progress queue, some updates could be lost whenever a work-in
// -progress render restarts by cloning from current. Similarly, if we only add
// updates to the current queue, the updates will be lost whenever an already
// in-progress queue commits and swaps with the current queue. However, by
// adding to both queues, we guarantee that the update will be part of the next
// work-in-progress. (And because the work-in-progress queue becomes the
// current queue once it commits, there's no danger of applying the same
// update twice.)
// 我们附加到两个队列的原因是因为否则我们可能会掉线
// 更新而不进行处理。例如，如果我们仅将更新添加到
// 进行中的工作队列，每次进行中的工作都会丢失一些更新
// -progress render通过从当前克隆开始重新启动。同样，如果我们仅添加
// 更新到当前队列，每当已有更新时更新将丢失
// 处理中的队列提交并与当前队列交换。但是，通过
// 添加到两个队列中，我们保证更新将成为下一个队列的一部分
// 工作正在进行中。 （并且由于正在进行的队列变成了
// 当前队列一旦提交，就没有应用相同队列的危险
// 更新两次。）
// Prioritization 优先次序
// --------------
//
// Updates are not sorted by priority, but by insertion; new updates are always
// appended to the end of the list.
// 更新不是按优先级排序，而是按插入排序；总是有新的更新
// 附加到列表的末尾。
// The priority is still important, though. When processing the update queue
// during the render phase, only the updates with sufficient priority are
// included in the result. If we skip an update because it has insufficient
// priority, it remains in the queue to be processed later, during a lower
// priority render. Crucially, all updates subsequent to a skipped update also
// remain in the queue *regardless of their priority*. That means high priority
// updates are sometimes processed twice, at two separate priorities. We also
// keep track of a base state, that represents the state before the first
// update in the queue is applied.
// 但是，优先级仍然很重要。处理更新队列时
// 在render阶段，只有具有足够优先级的更新才会
// 包含在结果中。如果由于更新不足而跳过更新
// 优先级，它会保留在队列中，以便稍后在较低的队列中进行处理
// 优先级渲染。至关重要的是，跳过更新之后的所有更新也
// 保留在队列中，无论其优先级如何。这意味着高度优先
// 更新有时会在两个不同的优先级下处理两次。我们也
// 跟踪基本状态，该状态代表第一个状态之前的状态
// 应用队列中的更新。
// For example:
//
//   Given a base state of '', and the following queue of updates
//
//     A1 - B2 - C1 - D2
//
//   where the number indicates the priority, and the update is applied to the
//   previous state by appending a letter, React will process these updates as
//   two separate renders, one per distinct priority level:
//   其中的数字表示优先级，更新应用于
//   通过添加一个字母来表示先前的状态，React会将这些更新处理为
//   两个单独的渲染，每个单独的优先级： 
//
//   First render, at priority 1:
//     Base state: ''
//     Updates: [A1, C1]
//     Result state: 'AC'
//
//   Second render, at priority 2:
//     Base state: 'A'            <-  The base state does not include C1,
//                                    because B2 was skipped.
//     Updates: [B2, C1, D2]      <-  C1 was rebased on top of B2
//     Result state: 'ABCD'
//
// Because we process updates in insertion order, and rebase high priority
// updates when preceding updates are skipped, the final result is deterministic
// regardless of priority. Intermediate state may vary according to system
// resources, but the final state is always the same.
// 因为我们按插入顺序处理更新，并重新安排高优先级
// 跳过之前的更新时进行更新，最终结果是确定的
// 不考虑优先级。中间状态可能会因系统而异
// 资源，但最终状态始终相同。 

```